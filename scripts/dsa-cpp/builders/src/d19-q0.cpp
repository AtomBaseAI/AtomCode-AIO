#include <bits/stdc++.h>
using namespace std;

long long min_path_sum(const std::vector<std::vector<long long>>& grid) {
    int R = (int)grid.size(), C = (int)grid[0].size();
    std::vector<std::vector<long long>> dp(R, std::vector<long long>(C, 0));
    dp[0][0] = grid[0][0];
    for (int c = 1; c < C; c++) dp[0][c] = dp[0][c - 1] + grid[0][c];
    for (int r = 1; r < R; r++) dp[r][0] = dp[r - 1][0] + grid[r][0];
    for (int r = 1; r < R; r++)
        for (int c = 1; c < C; c++) {
            long long up = dp[r - 1][c], left = dp[r][c - 1];
            dp[r][c] = (up < left ? up : left) + grid[r][c];
        }
    return dp[R - 1][C - 1];
}

int main() {
    int R, C;
    if (!(cin >> R >> C)) return 0;
    vector<vector<long long>> grid(R, vector<long long>(C));
    for (int r = 0; r < R; r++)
        for (int c = 0; c < C; c++) cin >> grid[r][c];
    cout << min_path_sum(grid) << "\n";
    return 0;
}
